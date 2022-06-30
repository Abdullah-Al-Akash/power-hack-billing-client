import React from 'react';

const Navbar = () => {
        return (
                <div class="container mx-auto px-12 navbar bg-stone-300">
                        <div class="flex-1">
                                <a class="btn btn-ghost normal-case text-xl">Power Hack</a>
                        </div>
                        <div class="flex-none">
                                <h2 className="text-xl font-bold">Paid Total: 100USD</h2>
                        </div>
                </div>
        );
};

export default Navbar;