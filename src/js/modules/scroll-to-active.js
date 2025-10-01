export default class ScrollActiveItem {
  /**
   * Конструктор
   * @param {string|HTMLElement} containerSelector - селектор или DOM-элемент контейнера
   * @param {string} activeClass - класс активного элемента
   */
  constructor(containerSelector, activeClass) {
    // Получение контейнера
    if (typeof containerSelector === 'string') {
      this.container = document.querySelector(containerSelector);
    } else if (containerSelector instanceof HTMLElement) {
      this.container = containerSelector;
    } else {
      this.container = null;
    }
    this.activeClass = activeClass;
  }

  /**
   * Проверка, что контейнер и активный элемент существуют
   * @returns {boolean}
   */
  isReady() {
    if (!this.container) {
      console.warn('Контейнер не найден');
      return false;
    }
    const activeItem = this.container.querySelector('.' + this.activeClass);
    if (!activeItem) {
      console.warn('Активный элемент не найден');
      return false;
    }
    return true;
  }

  /**
   * Выполняет прокрутку активного элемента в начало
   */
  scrollToActive() {
    if (!this.isReady()) return;

    const activeItem = this.container.querySelector('.' + this.activeClass);
    if (!activeItem) return; // ещё раз проверка, на всякий случай

    // Получаем размеры
    const containerRect = this.container.getBoundingClientRect();
    const activeRect = activeItem.getBoundingClientRect();

    // Расстояние от левой границы контейнера до активного элемента
    const offsetLeft = activeRect.left - containerRect.left;

    // Текущая прокрутка контейнера
    const scrollLeft = this.container.scrollLeft;

    // Итоговая позиция для прокрутки
    const targetScrollLeft = scrollLeft + offsetLeft;

    // Плавная прокрутка
    this.container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }
}