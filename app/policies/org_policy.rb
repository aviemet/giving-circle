class OrgPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def import?
    true
  end

  def about?
    true
  end
end
