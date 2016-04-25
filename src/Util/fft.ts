import FFT = require("FFT");

export class fft {

  public static toRealImag(timeData: number[]): { imag: Float64Array; real: Float64Array; } {
    let n: number = timeData.length;
    let fft: any = new FFT.complex(2 * n, false);
    let output: Float64Array = new Float64Array(2 * n);
    let input: Float64Array = new Float64Array(n);
    // copy timeData into the input array
    // FIXME: is this fix needed?
    // problem: complex transform, real timeData
    for (let i: number = 0; i < n; i++) {
      input[i] = timeData[i];
      //input[2 * i + 1] = 0;
    }
    fft.simple(output, input, "real");
    // Split output in real/imaginary parts
    let real: Float64Array = new Float64Array(n);
    let imag: Float64Array = new Float64Array(n);
    for (let i: number = 0; i < n; i ++) {
      real[i] = output[2 * i];
      imag[i] = output[2 * i + 1];
    }
    return {imag: imag, real: real};
  }

  public static toAmplPhas(timeData: Float64Array): { amplitude: Float64Array; phase: Float64Array; } {
    let n: number = timeData.length;
    let fft: any = new FFT.complex(2 * n, false);
    let output: Float64Array = new Float64Array(2 * n);
    let input: Float64Array = new Float64Array(2 * n);
    // copy timeData into the input array
    // FIXME: is this fix needed?
    // problem: complex transform, real timeData
    for (let i: number = 0; i < n; i++) {
      input[2 * i] = timeData[i];
      input[2 * i + 1] = 0;
    }
    fft.simple(output, input, "complex");
    // Represent complex output in amplitude/phase form
    let ampl: Float64Array = new Float64Array(n);
    let phas: Float64Array = new Float64Array(n);
    for (let i: number = 0, x: number, y: number; i < n; i += 1) {
      x = output[2 * i];
      y = output[2 * i + 1];
      ampl[i] = Math.sqrt(x * x + y * y);
      phas[i] = Math.atan2(y, x);
    }
    return { amplitude: ampl, phase: phas };
  }
}
