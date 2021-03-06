import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
import {ENTER, SPACE} from '../core/keyboard/keycodes';

@Component({
  moduleId: module.id,
  selector: 'md-option',
  host: {
    'role': 'option',
    'tabindex': '0',
    '[class.md-selected]': 'selected',
    '[attr.aria-selected]': 'selected.toString()',
    '(click)': 'select()',
    '(keydown)': '_handleKeydown($event)'
  },
  templateUrl: 'option.html',
  styleUrls: ['select.css'],
  encapsulation: ViewEncapsulation.None
})
export class MdOption {
  private _selected = false;

  /** Event emitted when the option is selected. */
  @Output() onSelect = new EventEmitter();

  constructor(private _element: ElementRef, private _renderer: Renderer) {}

  /** Whether or not the option is currently selected. */
  get selected(): boolean {
    return this._selected;
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   * TODO(kara): Add input property alternative for node envs.
   */
  get viewValue(): string {
    return this._getHostElement().textContent.trim();
  }

  /** Selects the option. */
  select(): void {
    this._selected = true;
    this.onSelect.emit();
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
  }

  /** Sets focus onto this option. */
  focus(): void {
    this._renderer.invokeElementMethod(this._getHostElement(), 'focus');
  }

  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this.select();
    }
  }

  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

}
