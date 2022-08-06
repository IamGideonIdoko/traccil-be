import { argv } from 'process';
import path from 'path';
import { readdirSync, rename } from 'fs';

// [...nm.split('.')].slice(0, -1).join('.') + '.ts'

(async () => {
  // index of type argument
  const pathIdx = argv.indexOf('--path');
  /* type argument not found */
  if (pathIdx === -1)
    return console.log('\x1b[31m%s\x1b[0m', 'tstify.ts: Your must pass a pathIdx argument. Use --path <value>');

  /* type argument value not found */
  if (!argv[pathIdx + 1])
    return console.log('\x1b[31m%s\x1b[0m', 'tstify.ts : path argument has no value. Use --path <value>');

  const pathVal = argv[pathIdx + 1];

  const targetPath = path.join(__dirname, '../', pathVal);

  // Get an array of the files inside the folder
  const files = readdirSync(targetPath);

  // Loop through each file that was retrieved
  files.forEach((file) => {
    if (file.slice(-3) === '.js')
      rename(targetPath + `/${file}`, targetPath + `/${[...file.split('.')].slice(0, -1).join('.') + '.ts'}`, (err) =>
        console.log('\x1b[31m%s\x1b[0m', 'tstify.ts : Error => ', err),
      );
  });
  console.log('\x1b[42m%s\x1b[0m', 'tstify.ts : Operation successful');
})();
