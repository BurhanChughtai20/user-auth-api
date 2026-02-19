
const trimFields = (user: any) => ({
  ...user,
  // Use optional chaining and check type before trimming
  name: typeof user.name === 'string' ? user.name.trim() : user.name,
  email: typeof user.email === 'string' ? user.email.trim() : user.email,
  // Numbers don't have .trim(), so we just return them
  number: user.number 
});

const normalizeEmail = (user: any) => ({
  ...user,
  email: typeof user.email === 'string' ? user.email.toLowerCase() : user.email,
});

const compose = (...fns: Function[]) => (args: any) => fns.reduce((acc, fn) => fn(acc), args);

export const processUserInput = compose(trimFields, normalizeEmail);