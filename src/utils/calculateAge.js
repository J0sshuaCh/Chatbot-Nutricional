export const calculateAge = (dateString) => {
    if (!dateString) return '0 años';

    const today = new Date();
    const birthDate = new Date(dateString);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Ajustar si el día actual es menor al día de nacimiento
    if (days < 0) {
        months -= 1;
    }

    // Ajustar si el mes actual es menor al mes de nacimiento
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    // Construir la respuesta en español
    if (years === 0) {
        return `${months} ${months === 1 ? 'mes' : 'meses'}`;
    }

    if (months === 0) {
        return `${years} ${years === 1 ? 'año' : 'años'}`;
    }

    const textYears = `${years} ${years === 1 ? 'año' : 'años'}`;
    const textMonths = `${months} ${months === 1 ? 'mes' : 'meses'}`;

    return `${textYears} y ${textMonths}`;
};
