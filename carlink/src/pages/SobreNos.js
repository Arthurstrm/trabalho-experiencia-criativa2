import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholderImage from '../img/car_app_placeholder.webp'; // Importe uma imagem placeholder

const SobreNos = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Sobre o Nosso Aplicativo de Concessionária</h2>
          <p className="lead">
            Bem-vindo ao CarLink App, a sua solução completa para todas as necessidades automotivas. Nossa missão é simplificar o processo de compra, venda e manutenção de veículos, colocando o poder na palma da sua mão.
          </p>
          <p>
            Nascemos da paixão por carros e da frustração com os processos tradicionais e demorados das concessionárias. Em 2025, nossa equipe de entusiastas da tecnologia e especialistas automotivos se uniu para criar uma plataforma que fosse intuitiva, transparente e eficiente.
          </p>
          <p>
            Desde então, temos trabalhado incansavelmente para desenvolver um aplicativo que atenda a todas as suas necessidades. Seja você um comprador de primeira viagem, um entusiasta experiente ou alguém que precisa de serviços de manutenção confiáveis, o CarLink App foi projetado pensando em você.
          </p>
          <p>
            Nosso compromisso é com a inovação contínua, a transparência em todas as transações e a construção de uma comunidade de apaixonados por carros. Acreditamos que encontrar o carro perfeito, vender seu veículo atual ou agendar uma revisão nunca deve ser complicado.
          </p>
          <p>
            Explore o CarLink App hoje e descubra uma nova maneira de interagir com o mundo automotivo. Estamos aqui para simplificar sua jornada e garantir que cada experiência seja positiva e eficiente.
          </p>
          {/* Você pode adicionar mais texto aqui */}
        </div>
        <div className="col-md-6">
          <img
            src={placeholderImage}
            alt="Aplicativo de Concessionária"
            className="img-fluid rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default SobreNos;