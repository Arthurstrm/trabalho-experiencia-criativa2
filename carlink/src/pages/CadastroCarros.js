import React from 'react';

function CadastroCarro() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="marcaCarro" className="form-label">Marca</label>
                            <input type="text" className="form-control" id="marcaCarro" placeholder="Ex: Toyota" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="modeloCarro" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modeloCarro" placeholder="Ex: Corolla" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="anoCarro" className="form-label">Ano</label>
                            <input type="number" className="form-control" id="anoCarro" placeholder="Ex: 2022" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="placaCarro" className="form-label">Placa</label>
                            <input type="text" className="form-control" id="placaCarro" placeholder="Ex: ABC1D23" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="renavamCarro" className="form-label">RENAVAM</label>
                            <input type="text" className="form-control" id="renavamCarro" placeholder="Ex: 123456789" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="chassiCarro" className="form-label">Chassi</label>
                            <input type="text" className="form-control" id="chassiCarro" placeholder="Ex: 9BWZZZ377VT004251" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="corCarro" className="form-label">Cor</label>
                            <input type="text" className="form-control" id="corCarro" placeholder="Ex: Preto" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="motorCarro" className="form-label">Motor</label>
                            <select className="form-control" id="motorCarro">
                                <option value="">Selecione</option>
                                <option value="1.0">1.0</option>
                                <option value="1.4">1.4</option>
                                <option value="1.6">1.6</option>
                                <option value="2.0">2.0</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="potenciaCarro" className="form-label">Potência (CV)</label>
                            <input type="number" className="form-control" id="potenciaCarro" placeholder="Ex: 120" />
                        </div>

                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroCarro;
