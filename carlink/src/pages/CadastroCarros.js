import React from 'react';

function CadastroCarro() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <input type="text" className="form-control" id="marca" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="modelo" className="form-label">Modelo</label>
                            <input type="text" className="form-control" id="modelo" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ano" className="form-label">Ano</label>
                            <input type="number" className="form-control" id="ano" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="placa" className="form-label">Placa</label>
                            <input type="text" className="form-control" id="placa" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="renavam" className="form-label">RENAVAM</label>
                            <input type="text" className="form-control" id="renavam" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="chassi" className="form-label">Chassi</label>
                            <input type="text" className="form-control" id="chassi" />
                        </div>

                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CadastroCarro;
