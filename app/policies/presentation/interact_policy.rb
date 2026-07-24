class Presentation::InteractPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
  end

  def show?
    return false unless record&.active?
    return true if user.has_role?(:super_admin)

    record.membership_for_user(user).present?
  end

  def upsert?
    return false unless record&.active?
    return false if record.accepting_interaction.blank?

    record.membership_for_user(user).present?
  end
end
