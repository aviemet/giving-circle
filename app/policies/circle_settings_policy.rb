class CircleSettingsPolicy < ApplicationPolicy
  def manage_settings?
    return false unless user

    user.has_role?(:super_admin) || user.has_role?(:admin, record)
  end
end
