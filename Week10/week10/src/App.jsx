import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import SearchBar from './components/Searchbar';
import UserModal from './components/UserModal';
import ErrorMessage from './components/ErrorMessage';
import { fetchUsers, createUser, updateUser, deleteUser } from './services/api';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function App(){
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create')
    const [editingUser, setEditingUser] = useState(null)

    //Fetch users on mount
    useEffect(() => {
        loadUsers()
    },[]);

    //Filter users when search term changes
    useEffect(() => {
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes((searchTerm || '').toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    },[searchTerm, users]);

    //Handle User Event
    //Load users
    const loadUsers = async() => {
        try{
            setLoading(true);
            setError(null);
            const data = await fetchUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch(err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    //Create users
    const handleCreateUser = async (userData) => {
        try{
            setError(null);
            const newUser = await createUser(userData);
            const userWithId = {...userData, id: newUser.id || Date.now()};
            setUsers(prev => [userWithId, ...prev]);
            closeModal();
        } catch(err) {
            setError(err.message);
        }
    };

    //Update users
    const handleUpdateUser = async (id, userData) => {
        try{
            setError(null);
            await updateUser(id, userData);
            setUsers(prev => prev.map(user =>
                user.id === id ? {...user, ...userData} : user
            ));
            closeModal();
        } catch(err){
            setError(err.message);
        }
    };

    //Delete users
    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) 
            return;
        try {
            setError(null);
            await deleteUser(id);
            setUsers(prev => prev.filter(user => user.id !== id));
        } catch(err) {
            setError(err.message);
        }
    };

    //Modal functions
    //On user create
    const openCreateModal = () => {
        setModalMode('create');
        setEditingUser(null);
        setShowModal(true);
    }

    //On user edit
    const openEditModal = (user) => {
        setModalMode('edit');
        setEditingUser(user);
        setShowModal(true);
    }

    //Close
    const closeModal = () => {
        setShowModal(false);
        setEditingUser(null);
    }

    //Submit event
    const handleModalSubmit = async (formData) => {
        if(modalMode === 'create'){
            await handleCreateUser(formData);
        } else {
            await handleUpdateUser(editingUser.id, formData);
        }
    };

    //Pagination on filtering users
    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE); //Slice the result page from startIndex with ITEM_PER_PAGE per result page

    //Switching pages
    const goToPage = (page) => {
        if(page >= 1 && page <= totalPages){
            setCurrentPage(page);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-lg text-gray-600">Loading users...</div>
            </div>
        );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
          
            {error && <ErrorMessage message={error} />}

            {/* Search and Add Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
              >
                <Plus size={20} />
                Add User
              </button>
            </div>
          </div>

        {/* Users Table */}
        <UserTable
          users={paginatedUsers}
          onEdit={openEditModal}
          onDelete={handleDeleteUser}
          currentPage={currentPage}
          totalPages={totalPages}
          totalUsers={filteredUsers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={goToPage}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <UserModal
          mode={modalMode}
          user={editingUser}
          onSubmit={handleModalSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );

}