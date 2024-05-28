function formatAmount(amount: number) {
  const greaterThanZero = amount > 0;
  const amountWithoutSign = greaterThanZero ? amount : -amount;

  return `${greaterThanZero ? '+' : '-'} $${amountWithoutSign.toFixed(2)}`;
}

export default formatAmount;
