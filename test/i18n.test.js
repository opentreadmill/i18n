import { describe, it, expect } from "vitest";
import I18n from "../index.js";

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
});