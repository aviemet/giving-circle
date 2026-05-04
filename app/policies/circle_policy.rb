class CirclePolicy < ApplicationPolicy
  class Scope < Scope
  end

  def index?
    user.present?
  end

  def about?
    true
  end
end
