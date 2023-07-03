import { Graphics } from "cc";
export class Graph extends Graphics {
    _render(render) {
        super._render(render);
        if (this.node._uiProps.colorDirty) {
            this.updateOpacity();
        }
    }
    updateOpacity() {
        const impl = this.impl;
        if (!impl) {
            return;
        }
        const renderDataList = impl && impl.getRenderDataList();
        if (renderDataList.length <= 0 || !this.model) {
            return;
        }
        const subModelList = this.model.subModels;
        const opacity = this.node._uiProps.opacity;
        for (let i = 0; i < renderDataList.length; i++) {
            const renderData = renderDataList[i];
            const vb = new Float32Array(renderData.vertexStart * 8);
            for (let j = 0; j < renderData.vertexStart * 8; j++) {
                if (j % 8 === 6) {
                    vb[j] = renderData.vData[j] * opacity;
                }
                else {
                    vb[j] = renderData.vData[j];
                }
            }
            subModelList[i].inputAssembler.vertexBuffers[0].update(vb);
        }
    }
}
