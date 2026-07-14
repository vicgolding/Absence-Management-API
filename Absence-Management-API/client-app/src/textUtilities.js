import { expect } from 'chai';

function nameCase(fullName) {
    const names = fullName.split(' ');
    const titleCasedName = names.map((name) => {
        return name[0].toUpperCase() + name.substring(1);
    });
    return titleCasedName.join(' ');
}

expect(nameCase('arthur morgan')).to.be.a('string');
expect(nameCase('a')).to.equal('A');
expect(nameCase('arthur')).to.equal('Arthur');
expect(nameCase('arthur morgan')).to.equal('Arthur Morgan');