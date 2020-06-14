document.write('hello ');
class Animal {
  private name: string = 'dell';
  public static getUltimateAnswer(): number {
    return 42
  }
  public getName() {
    return this.name
  }
}


class Cat extends Animal {
  public getName(): string {
    return '[CAT]' + super.getName()
  }
}