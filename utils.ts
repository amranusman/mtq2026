
export interface Age {
  years: number;
  months: number;
  days: number;
}

/**
 * Calculates the exact age between two dates.
 * Returns {years, months, days}
 */
export function calculateAge(birthDateStr: string, referenceDateStr: string): Age {
  if (!birthDateStr || !referenceDateStr) return { years: 0, months: 0, days: 0 };

  const birthDate = new Date(birthDateStr);
  const refDate = new Date(referenceDateStr);

  let years = refDate.getFullYear() - birthDate.getFullYear();
  let months = refDate.getMonth() - birthDate.getMonth();
  let days = refDate.getDate() - birthDate.getDate();

  // Adjustment for negative days
  if (days < 0) {
    months--;
    // Get total days in the previous month of refDate
    const lastDayOfPrevMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }

  // Adjustment for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Formats an Age object into a human-readable Indonesian string.
 */
export function formatAge(age: Age): string {
  return `${age.years} Tahun ${age.months} Bulan ${age.days} Hari`;
}

/**
 * Checks if the calculated age is within the maximum limit.
 */
export function isAgeAllowed(age: Age, maxAge: Age): boolean {
  if (age.years < maxAge.years) return true;
  if (age.years > maxAge.years) return false;
  
  if (age.months < maxAge.months) return true;
  if (age.months > maxAge.months) return false;
  
  return age.days <= maxAge.days;
}
