import { exec, type ExecOptions } from 'child_process';

export function run(cmd: string, options?: ExecOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);

      resolve(console.log(stdout));
    });
  });
}
