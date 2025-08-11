class Presentation::ActivePolicy < ApplicationPolicy

  class Scope < ApplicationPolicy::Scope
  end

  def public_show?
    return false unless record&.active?

    return true if user.has_role?(:super_admin)

    user.circles.include?(record.circle)
  end
end
