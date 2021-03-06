import GL from "./G3D.GL";
import { IWebGLBuffer } from "../types/webgl";


interface IElementBufferConfig {
    data: Uint32Array | Uint16Array | ArrayBuffer
}

class ElementBuffer {

    arrayBuffer: ArrayBuffer;
    glBuffer: IWebGLBuffer;

    constructor({ data }: IElementBufferConfig) {

        const { gl, buffers } = GL;

        // create this.glBuffer
        this.glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // create this.arrayBuffer
        if (data instanceof Uint32Array || data instanceof Uint16Array) {
            this.arrayBuffer = data.buffer;
        } else if (data instanceof ArrayBuffer) {
            this.arrayBuffer = data;
        }

        // hook on GL
        buffers.push(this);

    }

    destructor(): void {

        const { gl } = GL;
        gl.deleteBuffer(this.glBuffer);
    }

}

export default ElementBuffer;