exports.html = (strings, ...values) => {
  return strings.reduce((s, cur, i) => {
    return (
      s + strings[i] + (i < values.length ? values[i] : '')
    );
  }, '');
};
