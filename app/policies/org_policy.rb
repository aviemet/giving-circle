class OrgPolicy < ApplicationPolicy
  class Scope < Scope
  end

  def import?
    true
  end
end
