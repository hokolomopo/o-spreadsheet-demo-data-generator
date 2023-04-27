export function zoneToXc(zone) {
    const { top, bottom, left, right } = zone;
    const hasHeader = "hasHeader" in zone ? zone.hasHeader : false;
    const isOneCell = top === bottom && left === right;
    if (bottom === undefined && right !== undefined) {
        return top === 0 && !hasHeader
            ? `${numberToLetters(left)}:${numberToLetters(right)}`
            : `${toXC(left, top)}:${numberToLetters(right)}`;
    } else if (right === undefined && bottom !== undefined) {
        return left === 0 && !hasHeader
            ? `${top + 1}:${bottom + 1}`
            : `${toXC(left, top)}:${bottom + 1}`;
    } else if (bottom !== undefined && right !== undefined) {
        return isOneCell ? toXC(left, top) : `${toXC(left, top)}:${toXC(right, bottom)}`;
    }

    throw new Error(_lt("Bad zone format"));
}

export function numberToLetters(n) {
    if (n < 0) {
        throw new Error(`number must be positive. Got ${n}`);
    }
    if (n < 26) {
        return String.fromCharCode(65 + n);
    } else {
        return numberToLetters(Math.floor(n / 26) - 1) + numberToLetters(n % 26);
    }
}

export function lettersToNumber(letters) {
    let result = 0;
    const l = letters.length;
    for (let i = 0; i < l; i++) {
      let n = letters.charCodeAt(i) - 65 + (i < l - 1 ? 1 : 0);
      result += n * 26 ** (l - i - 1);
    }
    return result;
  }

export function toXC(col, row, rangePart = { colFixed: false, rowFixed: false }) {
    return (
        (rangePart.colFixed ? "$" : "") +
        numberToLetters(col) +
        (rangePart.rowFixed ? "$" : "") +
        String(row + 1)
    );
}

export const cellReference = new RegExp(/\$?([A-Z]{1,3})\$?([0-9]{1,7})/, "i");
export function toCartesian(xc) {
    xc = xc.toUpperCase().trim();
    const match = xc.match(cellReference);
    if (match !== null) {
        const [m, letters, numbers] = match;
        if (m === xc) {
            const col = lettersToNumber(letters);
            const row = parseInt(numbers, 10) - 1;
            return { col, row };
        }
    }
    throw new Error(`Invalid cell description: ${xc}`);
}
