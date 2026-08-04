// @ts-check

/**
 * @param {Pick<SiteConfig, 'bookingUrl'|'email'|'bookingSubject'>} contact
 */
export const resolveBookingUrl = (contact) => contact.bookingUrl
  || `mailto:${contact.email}?subject=${encodeURIComponent(contact.bookingSubject)}`;
