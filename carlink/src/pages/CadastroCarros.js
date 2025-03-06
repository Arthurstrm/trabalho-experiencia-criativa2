import React from 'react';

function CadastroCarro() {
    return (
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
    );
}

export default CadastroCarro;