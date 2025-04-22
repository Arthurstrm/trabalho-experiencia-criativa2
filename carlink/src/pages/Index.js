import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import index_banner from '../img/index_banner.webp';
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


const Index = () => {
  return (
    <div className="container">
      <a href='/'>
        <div>
          <img src={index_banner} alt="Index Banner" className="img-fluid mb-4 rounded" />
        </div>
      </a>
      <div className="row">
        {carData.map((car, index) => (
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

export default Index;