import { Injectable } from '@nestjs/common';

@Injectable()
export class RatesService {
  getPlaceholder(): string {
    return '1 USD = 83.12 INR (placeholder — real prices arrive in Module 5)';
  }
}
