class ThemePolicy < ApplicationPolicy
  class Scope < Scope
  end

  THEME_EDIT_ROLES = [:admin, :editor].freeze

  def about?
    true
  end

  def update?
    return false unless user

    user.has_role?(:super_admin) ||
      user.has_role?(:admin, record.circle) ||
      THEME_EDIT_ROLES.any? { |role| user.has_role?(role, record) }
  end

  alias edit? update?
end
