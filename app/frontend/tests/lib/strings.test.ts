import { describe, test, expect } from "vitest"

import { capitalize, toCamelCase, toKebabCase, toSnakeCase, initials, isNonEmptyString } from "../../lib/strings"

describe("capitalize", () => {
	test("capitalizes the first letter of a string", () => {
		expect(capitalize("hello")).toBe("Hello")
		expect(capitalize("hello world")).toBe("Hello world")
	})

	test("handles already capitalized strings", () => {
		expect(capitalize("Hello")).toBe("Hello")
		expect(capitalize("WORLD")).toBe("WORLD")
	})

	test("handles empty string", () => {
		expect(capitalize("")).toBe("")
	})

	test("handles single character", () => {
		expect(capitalize("a")).toBe("A")
		expect(capitalize("Z")).toBe("Z")
	})

	test("handles null and undefined", () => {
		expect(capitalize(null)).toBe("")
		expect(capitalize(undefined)).toBe("")
	})

	test("handles non-string inputs", () => {
		expect(capitalize(123 as any)).toBe("")
		expect(capitalize({} as any)).toBe("")
		expect(capitalize([] as any)).toBe("")
	})
})

describe("toCamelCase", () => {
	test("converts kebab-case to camelCase", () => {
		expect(toCamelCase("hello-world")).toBe("helloWorld")
		expect(toCamelCase("user-profile-settings")).toBe("userProfileSettings")
	})

	test("converts snake_case to camelCase", () => {
		expect(toCamelCase("hello_world")).toBe("helloWorld")
		expect(toCamelCase("user_profile_settings")).toBe("userProfileSettings")
	})

	test("converts space-separated words to camelCase", () => {
		expect(toCamelCase("hello world")).toBe("helloWorld")
		expect(toCamelCase("user profile settings")).toBe("userProfileSettings")
	})

	test("converts PascalCase to camelCase", () => {
		expect(toCamelCase("HelloWorld")).toBe("helloWorld")
		expect(toCamelCase("UserProfileSettings")).toBe("userProfileSettings")
	})

	test("converts mixed separators to camelCase", () => {
		expect(toCamelCase("hello-world_test space")).toBe("helloWorldTestSpace")
		expect(toCamelCase("User-Profile_Settings")).toBe("userProfileSettings")
	})

	test("handles numbers", () => {
		expect(toCamelCase("user123")).toBe("user123")
		expect(toCamelCase("123user")).toBe("123User")
		expect(toCamelCase("user-123-profile")).toBe("user123Profile")
	})

	test("handles empty string", () => {
		expect(toCamelCase("")).toBe("")
	})

	test("handles null and undefined", () => {
		expect(toCamelCase(null)).toBe("")
		expect(toCamelCase(undefined)).toBe("")
	})

	test("handles single word", () => {
		expect(toCamelCase("hello")).toBe("hello")
		expect(toCamelCase("Hello")).toBe("hello")
	})
})

describe("toKebabCase", () => {
	test("converts camelCase to kebab-case", () => {
		expect(toKebabCase("helloWorld")).toBe("hello-world")
		expect(toKebabCase("userProfileSettings")).toBe("user-profile-settings")
	})

	test("converts PascalCase to kebab-case", () => {
		expect(toKebabCase("HelloWorld")).toBe("hello-world")
		expect(toKebabCase("UserProfileSettings")).toBe("user-profile-settings")
	})

	test("converts snake_case to kebab-case", () => {
		expect(toKebabCase("hello_world")).toBe("hello-world")
		expect(toKebabCase("user_profile_settings")).toBe("user-profile-settings")
	})

	test("converts space-separated words to kebab-case", () => {
		expect(toKebabCase("hello world")).toBe("hello-world")
		expect(toKebabCase("user profile settings")).toBe("user-profile-settings")
	})

	test("converts mixed separators to kebab-case", () => {
		expect(toKebabCase("hello-world_test space")).toBe("hello-world-test-space")
		expect(toKebabCase("User-Profile_Settings")).toBe("user-profile-settings")
	})

	test("handles numbers", () => {
		expect(toKebabCase("user123")).toBe("user-123")
		expect(toKebabCase("123user")).toBe("123-user")
		expect(toKebabCase("user123Profile")).toBe("user-123-profile")
	})

	test("handles empty string", () => {
		expect(toKebabCase("")).toBe("")
	})

	test("handles null and undefined", () => {
		expect(toKebabCase(null)).toBe("")
		expect(toKebabCase(undefined)).toBe("")
	})

	test("handles single word", () => {
		expect(toKebabCase("hello")).toBe("hello")
		expect(toKebabCase("Hello")).toBe("hello")
	})
})

describe("toSnakeCase", () => {
	test("converts camelCase to snake_case", () => {
		expect(toSnakeCase("helloWorld")).toBe("hello_world")
		expect(toSnakeCase("userProfileSettings")).toBe("user_profile_settings")
	})

	test("converts PascalCase to snake_case", () => {
		expect(toSnakeCase("HelloWorld")).toBe("hello_world")
		expect(toSnakeCase("UserProfileSettings")).toBe("user_profile_settings")
	})

	test("converts kebab-case to snake_case", () => {
		expect(toSnakeCase("hello-world")).toBe("hello_world")
		expect(toSnakeCase("user-profile-settings")).toBe("user_profile_settings")
	})

	test("converts space-separated words to snake_case", () => {
		expect(toSnakeCase("hello world")).toBe("hello_world")
		expect(toSnakeCase("user profile settings")).toBe("user_profile_settings")
	})

	test("converts mixed separators to snake_case", () => {
		expect(toSnakeCase("hello-world_test space")).toBe("hello_world_test_space")
		expect(toSnakeCase("User-Profile_Settings")).toBe("user_profile_settings")
	})

	test("handles numbers", () => {
		expect(toSnakeCase("user123")).toBe("user_123")
		expect(toSnakeCase("123user")).toBe("123_user")
		expect(toSnakeCase("user123Profile")).toBe("user_123_profile")
	})

	test("handles empty string", () => {
		expect(toSnakeCase("")).toBe("")
	})

	test("handles null and undefined", () => {
		expect(toSnakeCase(null)).toBe("")
		expect(toSnakeCase(undefined)).toBe("")
	})

	test("handles single word", () => {
		expect(toSnakeCase("hello")).toBe("hello")
		expect(toSnakeCase("Hello")).toBe("hello")
	})
})

describe("initials", () => {
	test("returns first character of single word", () => {
		expect(initials("John")).toBe("J")
		expect(initials("mary")).toBe("M")
	})

	test("returns first character of first and last words", () => {
		expect(initials("John Doe")).toBe("JD")
		expect(initials("mary jane smith")).toBe("MS")
		expect(initials("Dr. John Smith Jr.")).toBe("DJ")
	})

	test("handles different separators", () => {
		expect(initials("John-Doe")).toBe("JD")
		expect(initials("mary_jane_smith")).toBe("MS")
		expect(initials("John Doe-Smith")).toBe("JS")
	})

	test("handles empty string", () => {
		expect(initials("")).toBeUndefined()
	})

	test("handles single character", () => {
		expect(initials("A")).toBe("A")
	})

	test("handles words with special characters", () => {
		expect(initials("O'Connor")).toBe("O")
		expect(initials("Jean-Pierre")).toBe("JP")
	})
})

describe("isNonEmptyString", () => {
	test("returns true for non-empty strings", () => {
		expect(isNonEmptyString("hello")).toBe(true)
		expect(isNonEmptyString(" ")).toBe(true)
		expect(isNonEmptyString("0")).toBe(true)
	})

	test("returns false for empty strings", () => {
		expect(isNonEmptyString("")).toBe(false)
	})

	test("returns false for null and undefined", () => {
		expect(isNonEmptyString(null as any)).toBe(false)
		expect(isNonEmptyString(undefined as any)).toBe(false)
	})

	test("returns false for non-string values", () => {
		expect(isNonEmptyString(123 as any)).toBe(false)
		expect(isNonEmptyString({} as any)).toBe(false)
		expect(isNonEmptyString([] as any)).toBe(false)
		expect(isNonEmptyString(true as any)).toBe(false)
		expect(isNonEmptyString(false as any)).toBe(false)
	})
})
