class CustomBlock {
    data;
    block;

    constructor({ data, block }) {
        this.data = data;
        this.block = block;
    }

    toggleStretched() {
        this.block.stretched = !!this.data.stretched;
    }

    // Rest of the block implementation
}
