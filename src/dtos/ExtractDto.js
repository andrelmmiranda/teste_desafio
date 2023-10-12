class ExtractDto{
    constructor(input, output){
        this.entrada = Number(input) || 0;
        this.saida = Number(output) || 0;
    }
}

module.exports = { ExtractDto };