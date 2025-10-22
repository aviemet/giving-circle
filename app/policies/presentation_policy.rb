class PresentationPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def activate?
    true
  end

  def controls?
    true
  end

  def show?
    true
  end

  def overview?
    true
  end
end
