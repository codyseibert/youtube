exports.slashDelimitedRegexReplacer = ({
  slashDelimitedString,
  text,
}) => {
  const [
    regex,
    replaceWith,
    regexOptions,
  ] = slashDelimitedString.split('/');

  return text.replace(
    new RegExp(regex, regexOptions),
    replaceWith
  );
};
