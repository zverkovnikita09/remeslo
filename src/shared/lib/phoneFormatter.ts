export const phoneFormatter = (phoneNumber: string, isShown: boolean): string => {
  const hiddenPhoneNumber = phoneNumber.slice(0, 8) + 'XXX-XX-XX';
  return isShown ? phoneNumber : hiddenPhoneNumber;
}