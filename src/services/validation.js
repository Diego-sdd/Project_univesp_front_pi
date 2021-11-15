export function validateCpf(strCPF) {
    if (typeof strCPF !== 'string') {
        return false;
    }
    if (strCPF.length === 0) {
        return false;
    }
    let aux = strCPF.match(/\d/g).join("");
    var Soma = 0;
    var Resto;

    if (aux === "00000000000") {
        return false;
    }
    
    for (let i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(aux.substring(i - 1, i)) * (11 - i);
    }
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) {
        Resto = 0;
    }
    if (Resto !== parseInt(aux.substring(9, 10))) {
        return false;
    }

    Soma = 0;
    for (let i = 1; i <= 10; i++) {
        Soma = Soma + parseInt(aux.substring(i - 1, i)) * (12 - i);
    }

    Resto = (Soma * 10) % 11;
    if ((Resto === 10) || (Resto === 11)) {
        Resto = 0;
    }
    if (Resto !== parseInt(aux.substring(10, 11))) {
        return false;
    }
    return true;
}

export function validateCnpj(s) {
    if (s === undefined) return false;
    if (s.length === 0) {
        return false;
    }
    const cnpj = s.replace(/[^\d]+/g, '');

    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) return false;

    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Cáculo de validação
    const t = cnpj.length - 2;
    const d = cnpj.substring(t);
    const d1 = parseInt(d.charAt(0));
    const d2 = parseInt(d.charAt(1));
    const calc = x => {
        const n = cnpj.substring(0, x);
        let y = x - 7;
        let s = 0;
        let r = 0;

        for (let i = x; i >= 1; i--) {
            s += n.charAt(x - i) * y--;
            if (y < 2) y = 9;
        }

        r = 11 - (s % 11);
        return r > 9 ? 0 : r;
    };

    return calc(t) === d1 && calc(t + 1) === d2;
}

export function validateEmail(email) {
    if (
        typeof email !== 'string' ||
        email.length < 4 ||
        !email.includes('@') ||
        !email.includes('.')
    ) {
        return false;
    }
    return true;
}
