type SubstanceType = 'comments' | 'subscribers' | 'views';

export const getNoun = (number: number, one: string, two: string, five: string) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
};

export const declinationSubstance = (number: number, type: SubstanceType) => {
    if (type === 'comments') {
        return number + ' ' + getNoun(number, 'комментарий', 'комментария', 'комментариев');
    }
    if (type === 'subscribers') {
        return number + ' ' + getNoun(number, 'подписчик', 'подписчика', 'подписчиков');
    }
    if (type === 'views') {
        return number + ' ' + getNoun(number, 'просмотр', 'просмотра', 'просмотров');
    }
};
