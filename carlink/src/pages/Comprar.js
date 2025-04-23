import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import carData from '../data/caraData.json';

const CarListing = ({ imageUrl, title, subtitle, yearMileage, price, link }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt={title}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text small">{subtitle}</p>
          <p className="card-text small">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar me-1" viewBox="0 0 16 16">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0v1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            {yearMileage}
          </p>
          <p className="card-text fw-bold">R$ {price}</p>
          <a href={link} className="btn btn-primary w-100">Ver oferta</a>
        </div>
      </div>
    </div>
  );
};

const Comprar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredCars, setFilteredCars] = useState(carData);

    // Efeito para aplicar filtragem e ordenação
    useEffect(() => {
        let result = carData;

        // Filtragem por nome
        if (searchTerm) {
            result = result.filter(car =>
                car.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Ordenação
        if (sortBy) {
            switch (sortBy) {
                case 'preco_asc':
                    result.sort((a, b) => a.price - b.price);
                    break;
                case 'preco_desc':
                    result.sort((a, b) => b.price - a.price);
                    break;
                case 'ano_desc':
                    result.sort((a, b) => {
                        const yearA = parseInt(a.yearMileage.split('/')[0]);
                        const yearB = parseInt(b.yearMileage.split('/')[0]);
                        return yearB - yearA;
                    });
                    break;
                  case 'ano_asc':
                    result.sort((a, b) => {
                        const yearA = parseInt(a.yearMileage.split('/')[0]);
                        const yearB = parseInt(b.yearMileage.split('/')[0]);
                        return yearA - yearB;
                    });
                    break;
                case 'alfabetico':
                    result.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                default:
                    break;
            }
        }

        setFilteredCars(result);
    }, [searchTerm, sortBy]);


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-2">Compre Seu Carro</h2>
      <p className="lead text-center mb-4">
        Confira as ofertas disponíveis.
      </p>
      {/* Barra de Busca e Sorteador */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            className="form-control"
            type="search"
            placeholder="Buscar carros..."
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select" aria-label="Ordenar por" onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="preco_asc">Preço: Descendente</option>
            <option value="preco_desc">Preço: Ascendente</option>
          </select>
        </div>
      </div>
      <div className="row">
        {filteredCars.map((car, index) => (
          <CarListing
            key={index}
            imageUrl={car.imageUrl}
            title={car.title}
            subtitle={car.subtitle}
            yearMileage={car.yearMileage}
            price={car.price}
            link={car.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Comprar;
