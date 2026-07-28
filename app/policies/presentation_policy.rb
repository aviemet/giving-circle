class PresentationPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def activate?
    circle_admin?
  end

  def controls?
    circle_admin?
  end

  def index?
    circle_admin?
  end

  def overview?
    circle_admin?
  end

  def members?
    circle_admin?
  end

  def messaging?
    circle_admin?
  end

  def settings?
    circle_admin?
  end

  def show?
    true
  end

  def save_as_template?
    true
  end

  private

  def circle_admin?
    return false unless user

    user.has_role?(:super_admin) || user.has_role?(:admin, record.circle)
  end
end
