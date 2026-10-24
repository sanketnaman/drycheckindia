interface DbErrorLike {
  code?: string;
  message?: string;
}

/**
 * Maps PostgREST/PostgreSQL errors to safe, actionable admin-facing messages.
 * Never leaks connection details or secrets.
 */
export function mapDbError(error: DbErrorLike | null | undefined): string {
  if (!error) return 'The database returned an unknown error. Please try again.';

  const code = error.code ?? '';
  const message = error.message ?? '';

  if (code === '42501' || /row-level security|permission denied/i.test(message)) {
    return 'You do not have permission to modify this data. Your session may not be an admin session.';
  }
  if (code === '23505' || /duplicate key/i.test(message)) {
    return 'A record with these details already exists.';
  }
  if (code === '23514' || /check constraint/i.test(message)) {
    return 'The database rejected these values (validation constraint). Local restrictions must name a locality, and time ranges must not wrap past midnight.';
  }
  if (code === '23503' || /foreign key/i.test(message)) {
    return 'A referenced record no longer exists.';
  }
  if (code === 'PGRST' || /fetch|network|failed to fetch/i.test(message)) {
    return 'Could not reach the database. Please try again.';
  }
  // Never surface the raw driver message: it can contain schema, table and
  // column names, SQL fragments, or connection details.
  return 'The database rejected this request. Please try again.';
}

export function isPermissionError(error: DbErrorLike | null | undefined): boolean {
  return (
    !!error &&
    (error.code === '42501' || /row-level security|permission denied/i.test(error.message ?? ''))
  );
}
