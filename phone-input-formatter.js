class PhoneInputFormatter {
    constructor(selector = 'input[type="tel"]') {
        this.selector = selector;
        this.phoneInputs = [];
        this.init();
    }

    init() {
        this.updatePhoneInputs();
    }

    updatePhoneInputs(newSelector = null) {
        if (newSelector) {
            this.selector = newSelector;
        }
        
        // Удаляем старые обработчики
        this.removeEventListeners();
        
        // Получаем новые элементы
        this.phoneInputs = Array.from(document.querySelectorAll(this.selector));
        
        // Добавляем обработчики
        this.addEventListeners();
    }

    addEventListeners() {
        this.phoneInputs.forEach(input => {
            input.addEventListener('input', this.handleInput.bind(this));
            input.addEventListener('paste', this.handlePaste.bind(this));
            input.addEventListener('change', this.handleChange.bind(this));
        });
    }

    removeEventListeners() {
        this.phoneInputs.forEach(input => {
            input.removeEventListener('input', this.handleInput.bind(this));
            input.removeEventListener('paste', this.handlePaste.bind(this));
            input.removeEventListener('change', this.handleChange.bind(this));
        });
    }

    handleInput(e) {
        const input = e.target;
        let value = input.value;
        
        if (value.startsWith('7') && !value.startsWith('+7')) {
            input.value = '+7' + value.substring(1);
            return;
        }
        
        if (value.startsWith('8') && !value.startsWith('+7')) {
            input.value = '+7' + value.substring(1);
            return;
        }
        
        if (value.startsWith('+7') && value.length > 2) {
            let nextChar = value[2];
            if (nextChar === '7' || nextChar === '8') {
                input.value = '+7' + value.substring(3);
                return;
            }
        }
        
        let cleaned = value.replace(/\D/g, '');
        if (cleaned.startsWith('7')) {
            input.value = '+7' + cleaned.substring(1, 11);
        } else if (cleaned.startsWith('8')) {
            input.value = '+7' + cleaned.substring(1, 11);
        } else if (cleaned.startsWith('+7')) {
            input.value = '+7' + cleaned.substring(2, 12);
        } else if (cleaned.length > 0) {
            input.value = '+7' + cleaned.substring(0, 10);
        }
    }

    handlePaste(e) {
        e.preventDefault();
        const input = e.target;
        let pasteData = (e.clipboardData || window.clipboardData).getData('text');
        let cleaned = pasteData.replace(/\D/g, '');
        
        if (cleaned.startsWith('7')) {
            input.value = '+7' + cleaned.substring(1, 11);
        } else if (cleaned.startsWith('8')) {
            input.value = '+7' + cleaned.substring(1, 11);
        } else if (cleaned.startsWith('+7')) {
            input.value = '+7' + cleaned.substring(2, 12);
        } else {
            input.value = '+7' + cleaned.substring(0, 10);
        }
    }

    handleChange(e) {
        const input = e.target;
        let value = input.value.trim();
        
        if (/^\+7\d{10}$/.test(value)) {
            return;
        }
        
        let cleaned = value.replace(/\D/g, '');
        
        if (cleaned.length === 11 && (cleaned.startsWith('7') || cleaned.startsWith('8'))) {
            input.value = '+7' + cleaned.substring(1);
        } else if (cleaned.length === 10) {
            input.value = '+7' + cleaned;
        } else if (cleaned.length > 11 && cleaned.startsWith('7')) {
            input.value = '+7' + cleaned.substring(1, 12);
        } else if (cleaned.length > 11 && cleaned.startsWith('8')) {
            input.value = '+7' + cleaned.substring(1, 12);
        } else if (cleaned.length > 0) {
            input.value = '+7' + cleaned.substring(0, 10);
        } else {
            input.value = '';
        }
    }
}
