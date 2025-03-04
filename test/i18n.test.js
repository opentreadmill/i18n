import { describe, it, expect, vi } from "vitest";
import I18n from "../index.js";
import { JSDOM } from "jsdom";

const dom = new JSDOM('<html><body><p data-i18n="string_to_translate"></p></body></html>')

global.fetch = vi.fn();
global.document = dom.window.document;
global.window = dom.window;

function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
}

describe("I18n Module", () => {
    it("should return the key if no translation is available", () => {
        const i18n = new I18n();
        expect(i18n.translate("hello")).toBe("hello");
    });

    it("should replace parameters in translations", () => {
        const i18n = new I18n();
        i18n.translations = { "greeting": "Hello, {name}!" };
        expect(i18n.translate("greeting", { name: "Alice" })).toBe("Hello, Alice!");
    });

    it("should load a translation file", async () => {
        const i18n = new I18n();
        fetch.mockResolvedValue(createFetchResponse({"string_to_translate":"String To Translate"}));

        await i18n.loadLanguage('en');
        
        expect(fetch).toHaveBeenCalledWith('translations/en.json');
        expect(i18n.translate("string_to_translate")).toBe("String To Translate");
    })

    it("should translate elements on load", async () => {
        const i18n = new I18n();
        fetch.mockResolvedValue(createFetchResponse({"string_to_translate":"String To Translate"}));

        await i18n.loadLanguage('en');
        
        expect(document.querySelector('p').innerHTML).toBe('String To Translate');
    })
});