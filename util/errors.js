'use strict';

class DomainError extends Error {

  constructor(original, message, code) {
    super(message);
    this.original = original;
    this.code = code;
  }

  toJSON() {
    return { message: this.message };
  }
}

class InternalError extends DomainError {
  constructor(original, message = 'Internal error') {
    super(original, message, 500);
  }
}

class ValidationError extends DomainError {
  constructor(original, message = 'Invalid request') {
    super(original, message, 400);
  }
}

class NotFoundError extends DomainError {
  constructor(original, message = 'Resource not found') {
    super(original, message, 400);
  }
}

class AccessDenied extends DomainError {
  constructor(original, message = 'Access denied') {
    super(original, message, 403);
  }
}

module.exports = {
  DomainError,
  InternalError,
  ValidationError,
  NotFoundError,
  AccessDenied
};