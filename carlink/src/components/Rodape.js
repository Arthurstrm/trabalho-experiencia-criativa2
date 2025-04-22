import React from 'react';

const Rodape = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© 2025 CarLink. Todos os direitos reservados.</p>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
    text: {
        margin: 0,
        fontSize: '14px',
    },
};

export default Rodape;