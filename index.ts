
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

(async () => {
  for (let bv = 1; bv < 4; bv += 0.1) {
    const command: string[] = [
      'ffmpeg',
      '-i new-release-presave-faststart.mp4',
      `-b:v ${bv.toFixed(1)}M`,
      '-movflags +faststart',
      `dist/bv${bv.toFixed(1).replace(/\./g, '-')}.mp4`
    ];

    console.log(command.join(' '));

    const { stderr, stdout } = await execAsync(command.join(' '));

    if (stderr) {
      console.error(stderr);
    }
  }
})();
