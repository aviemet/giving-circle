class Circles::FontPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
  end

  def index?
    circle_member?
  end

  def create?
    circle_member?
  end

  private

  def circle_member?
    return false unless user

    return true if user.has_role?(:super_admin)

    user.circles.include?(record)
  end
end
