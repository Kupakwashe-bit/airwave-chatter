import { z } from 'zod';

// Message validation schema
export const messageSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Message cannot be empty')
    .max(500, 'Message cannot exceed 500 characters')
    .refine(
      (text) => !/<script|javascript:|data:/i.test(text),
      'Invalid content detected'
    ),
});

// Chat ID validation
export const chatIdSchema = z.string().uuid('Invalid chat ID format');

// Sanitize user input to prevent XSS
export function sanitizeMessage(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Validate message input
export function validateMessage(text: string): { isValid: boolean; error?: string } {
  try {
    messageSchema.parse({ text });
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid message' };
    }
    return { isValid: false, error: 'Validation failed' };
  }
}

// Rate limiting for message sending
class RateLimiter {
  private timestamps: number[] = [];
  private readonly maxMessages: number;
  private readonly timeWindow: number;

  constructor(maxMessages = 10, timeWindowMs = 60000) {
    this.maxMessages = maxMessages;
    this.timeWindow = timeWindowMs;
  }

  canSendMessage(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );
    
    if (this.timestamps.length >= this.maxMessages) {
      return false;
    }
    
    this.timestamps.push(now);
    return true;
  }

  getRemainingTime(): number {
    if (this.timestamps.length < this.maxMessages) {
      return 0;
    }
    
    const oldestTimestamp = Math.min(...this.timestamps);
    const remainingTime = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.max(0, remainingTime);
  }
}

export const messageRateLimiter = new RateLimiter();
