module Admin
  class MembersController < AdminController
    include Searchable

    expose :members, -> { search(members.includes_associated, sortable_fields) }
    expose :member, scope: ->{ members }, find: ->(id, scope){ scope.includes_associated.find(id) }

  # GET /members
    def index
      authorize members
      render inertia: "Members/Index", props: {
        members: -> { members.render }
      }
    end

  # GET /members/:id
    def show
      authorize member
      render inertia: "Members/Show", props: {
        member: -> { member.render }
      }
    end

  # GET /members/new
    def new
      authorize Member.new
      render inertia: "Members/New", props: {
        member: Member.new.render
      }
    end

  # GET /members/:id/edit
    def edit
      authorize member
      render inertia: "Members/Edit", props: {
        member: member.render
      }
    end

  # POST /members
    def create
      authorize Member.new
      if member.save
        redirect_to [:admin, member], notice: "Member was successfully created."
      else
        redirect_to [:admin, new_member_path], inertia: { errors: member.errors }
      end
    end

  # PATCH/PUT /members/:id
    def update
      authorize member
      if member.update(member_params)
        redirect_to [:admin, member], notice: "Member was successfully updated."
      else
        redirect_to [:admin, edit_member_path], inertia: { errors: member.errors }
      end
    end

  # DELETE /members/:id
    def destroy
      authorize member
      member.destroy
      redirect_to [:admin, members_url], notice: "Member was successfully destroyed."
    end

    private

    def sortable_fields
      %w(first_name last_name number).freeze
    end

    def member_params
      params.require(:member).permit(:first_name, :last_name, :number)
    end
  end
end
