// Validation Utilities for PoultryPro Application

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

class ValidationService {
  // Email validation
  validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Phone validation
  validatePhone(phone: string): ValidationResult {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    const errors: string[] = [];

    if (!phone) {
      errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone)) {
      errors.push('Please enter a valid phone number');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Password validation
  validatePassword(password: string): ValidationResult {
    const errors: string[] = [];

    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        errors.push('Password must contain at least one special character');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Generic field validation
  validateField(value: any, rules: ValidationRule): ValidationResult {
    const errors: string[] = [];

    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push('This field is required');
      return { isValid: false, errors };
    }

    // Skip other validations if value is empty and not required
    if (!value && !rules.required) {
      return { isValid: true, errors: [] };
    }

    // String validations
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Must be at least ${rules.minLength} characters long`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Must be no more than ${rules.maxLength} characters long`);
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push('Invalid format');
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`Must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`Must be no more than ${rules.max}`);
      }
    }

    // Custom validation
    if (rules.custom) {
      const customResult = rules.custom(value);
      if (typeof customResult === 'string') {
        errors.push(customResult);
      } else if (!customResult) {
        errors.push('Invalid value');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Form validation
  validateForm(data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationResult {
    const allErrors: string[] = [];
    const fieldErrors: Record<string, string[]> = {};

    for (const [field, fieldRules] of Object.entries(rules)) {
      const fieldResult = this.validateField(data[field], fieldRules);
      if (!fieldResult.isValid) {
        fieldErrors[field] = fieldResult.errors;
        allErrors.push(...fieldResult.errors);
      }
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
    };
  }

  // Farm-specific validations
  validateFarmData(farmData: any): ValidationResult {
    const rules = {
      name: { required: true, minLength: 2, maxLength: 100 },
      location: { required: true },
      totalBirds: { required: true, min: 1, max: 1000000 },
      farmType: { required: true },
    };

    return this.validateForm(farmData, rules);
  }

  // Customer validation
  validateCustomerData(customerData: any): ValidationResult {
    const rules = {
      name: { required: true, minLength: 2, maxLength: 100 },
      email: { required: true },
      phone: { required: true },
      type: { required: true },
    };

    const formResult = this.validateForm(customerData, rules);
    
    // Additional email validation
    if (customerData.email) {
      const emailResult = this.validateEmail(customerData.email);
      if (!emailResult.isValid) {
        formResult.errors.push(...emailResult.errors);
        formResult.isValid = false;
      }
    }

    // Additional phone validation
    if (customerData.phone) {
      const phoneResult = this.validatePhone(customerData.phone);
      if (!phoneResult.isValid) {
        formResult.errors.push(...phoneResult.errors);
        formResult.isValid = false;
      }
    }

    return formResult;
  }

  // Order validation
  validateOrderData(orderData: any): ValidationResult {
    const rules = {
      customerId: { required: true },
      items: { required: true, custom: (items: any[]) => items && items.length > 0 },
      deliveryDate: { required: true },
    };

    return this.validateForm(orderData, rules);
  }

  // Service booking validation
  validateBookingData(bookingData: any): ValidationResult {
    const rules = {
      serviceId: { required: true },
      scheduledDate: { required: true },
      notes: { maxLength: 500 },
    };

    const formResult = this.validateForm(bookingData, rules);

    // Validate scheduled date is in the future
    if (bookingData.scheduledDate) {
      const scheduledDate = new Date(bookingData.scheduledDate);
      const now = new Date();
      if (scheduledDate <= now) {
        formResult.errors.push('Scheduled date must be in the future');
        formResult.isValid = false;
      }
    }

    return formResult;
  }

  // Feed order validation
  validateFeedOrderData(orderData: any): ValidationResult {
    const rules = {
      supplierId: { required: true },
      items: { required: true, custom: (items: any[]) => items && items.length > 0 },
      deliveryDate: { required: true },
    };

    return this.validateForm(orderData, rules);
  }

  // Image validation
  validateImage(imageUri: string, maxSizeBytes?: number): ValidationResult {
    const errors: string[] = [];

    if (!imageUri) {
      errors.push('Image is required');
      return { isValid: false, errors };
    }

    // Check if it's a valid URI
    try {
      new URL(imageUri);
    } catch {
      // If not a valid URL, check if it's a local file path
      if (!imageUri.startsWith('file://') && !imageUri.startsWith('content://')) {
        errors.push('Invalid image URI');
      }
    }

    // Additional size validation would require platform-specific implementation
    // This is a placeholder for future enhancement

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export const validationService = new ValidationService();
export default validationService;

// Common validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^\d+$/,
  DECIMAL: /^\d+(\.\d{1,2})?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Common validation rules
export const COMMON_RULES = {
  REQUIRED: { required: true },
  EMAIL: { required: true, pattern: VALIDATION_PATTERNS.EMAIL },
  PHONE: { required: true, pattern: VALIDATION_PATTERNS.PHONE },
  PASSWORD: { required: true, minLength: 8, pattern: VALIDATION_PATTERNS.PASSWORD },
  NAME: { required: true, minLength: 2, maxLength: 100 },
  DESCRIPTION: { maxLength: 500 },
  PRICE: { required: true, min: 0 },
  QUANTITY: { required: true, min: 1 },
};