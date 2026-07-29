import { describe, expect, test } from "vitest"

import {
	formFieldErrorMessage,
	getFormValueByName,
	getInputValue,
	nameToPath,
	setFormValue,
} from "@/components/Form/formFieldUtils"

describe("components/Form/formFieldUtils", () => {
	test("nameToPath converts bracket paths", () => {
		expect(nameToPath("user[name]")).toBe("user.name")
		expect(nameToPath("a.b.c")).toBe("a.b.c")
	})

	test("formFieldErrorMessage finds nested errors", () => {
		expect(formFieldErrorMessage(undefined, "a")).toBeUndefined()
		expect(formFieldErrorMessage({ "user.name": "Required" }, "user.name")).toBe("Required")
		expect(formFieldErrorMessage({ name: ["Bad"] }, "user.name")).toBe("Bad")
		expect(formFieldErrorMessage({ other: "x" }, "user.name")).toBeUndefined()
		expect(formFieldErrorMessage({ name: "  " }, "user.name")).toBeUndefined()
	})

	test("getInputValue and form value helpers", () => {
		document.body.innerHTML = `
			<form id="f">
				<input name="text" value="hello" />
				<input name="check" type="checkbox" checked />
				<input name="choice" type="radio" value="a" checked />
				<input name="choice" type="radio" value="b" />
				<select name="multi" multiple>
					<option value="1" selected>1</option>
					<option value="2">2</option>
					<option value="3" selected>3</option>
				</select>
				<textarea name="body">notes</textarea>
			</form>
		`
		const form = document.getElementById("f")
		expect(form).toBeTruthy()
		if(!(form instanceof HTMLFormElement)) {
			expect.unreachable()
			return
		}

		const text = form.elements.namedItem("text")
		if(!(text instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}
		expect(getInputValue(text)).toBe("hello")

		const check = form.elements.namedItem("check")
		if(!(check instanceof HTMLInputElement)) {
			expect.unreachable()
			return
		}
		expect(getInputValue(check)).toBe(true)

		const multi = form.elements.namedItem("multi")
		if(!(multi instanceof HTMLSelectElement)) {
			expect.unreachable()
			return
		}
		expect(getInputValue(multi)).toEqual(["1", "3"])

		expect(getFormValueByName(form, "text")).toBe("hello")
		expect(getFormValueByName(form, "choice")).toBe("a")
		expect(getFormValueByName(form, "missing")).toBeUndefined()

		setFormValue(form, "text", "world")
		expect(text.value).toBe("world")

		setFormValue(form, "check", false)
		expect(check.checked).toBe(false)

		setFormValue(form, "multi", ["2"])
		expect(Array.from(multi.selectedOptions).map(option => option.value)).toEqual(["2"])

		const body = form.elements.namedItem("body")
		if(!(body instanceof HTMLTextAreaElement)) {
			expect.unreachable()
			return
		}
		setFormValue(form, "body", "updated")
		expect(body.value).toBe("updated")

		setFormValue(form, "choice", "b")
		expect(getFormValueByName(form, "choice")).toBe("b")
	})
})
